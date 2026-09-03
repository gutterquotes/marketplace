import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import { LandingPageComponent } from './LandingPage';

const { waitFor } = testingLibrary;

describe('LandingPage', () => {
  const originalForceLocalPreview = process.env.REACT_APP_GQ_FORCE_LOCAL_PREVIEW;

  afterEach(() => {
    process.env.REACT_APP_GQ_FORCE_LOCAL_PREVIEW = originalForceLocalPreview;
  });

  it('renders the launch Fallback page on error', async () => {
    process.env.REACT_APP_GQ_FORCE_LOCAL_PREVIEW = 'true';

    const errorMessage = 'LandingPage failed';
    let e = new Error(errorMessage);
    e.type = 'error';
    e.name = 'Test';

    const { getAllByRole, getByRole, getByText } = render(
      <LandingPageComponent pageAssetsData={null} inProgress={false} error={e} />
    );

    await waitFor(() => {
      expect(getByText('Compare trusted gutter quotes near you.')).toBeInTheDocument();
      expect(getByText('Free for homeowners')).toBeInTheDocument();
      expect(getByText('No obligation')).toBeInTheDocument();
      expect(getByText('Need exclusive, high-intent homeowner gutter leads?')).toBeInTheDocument();
      expect(getByRole('link', { name: 'Start a free gutter quote' })).toHaveAttribute(
        'href',
        '/quote'
      );
      expect(getAllByRole('link', { name: 'For gutter pros' })[0]).toHaveAttribute(
        'href',
        '/pros'
      );
      expect(getByRole('link', { name: 'Get leads in your area' })).toHaveAttribute(
        'href',
        '/pros'
      );
    });
  });

  it('renders given pageAssetsData', async () => {
    process.env.REACT_APP_GQ_FORCE_LOCAL_PREVIEW = 'false';

    const data = {
      sections: [
        {
          sectionType: 'columns',
          sectionId: 'test-section',
          numColumns: 1,
          title: { fieldType: 'heading2', content: 'Landing page' },
          description: {
            fieldType: 'paragraph',
            content: 'This is the description of the section',
          },
          blocks: [
            {
              blockType: 'defaultBlock',
              blockId: 'test-block',
              title: { fieldType: 'heading3', content: 'Block title here' },
              text: {
                fieldType: 'markdown',
                content: `**Lorem ipsum** dolor sit amet, consectetur adipiscing elit. Nulla orci nisi, lobortis sit amet posuere et, vulputate sit amet neque. Nam a est id lectus viverra sagittis. Proin sed imperdiet lorem. Duis aliquam fermentum purus, tincidunt venenatis felis gravida in. Sed imperdiet mi vitae consequat rhoncus. Sed velit leo, porta at lorem ac, iaculis fermentum leo. Morbi tellus orci, bibendum id ante vel, hendrerit efficitur lectus. Proin vitae condimentum justo. Phasellus finibus nisi quis neque feugiat, ac auctor ipsum suscipit.`,
              },
            },
          ],
        },
      ],
    };

    const { getByText } = render(
      <LandingPageComponent
        pageAssetsData={{ landingPage: { data } }}
        inProgress={false}
        error={null}
      />
    );

    await waitFor(() => {
      // Expect following texts to be found from rendered UI (inside <body>)
      expect(getByText('Landing page')).toBeInTheDocument();
      expect(getByText('This is the description of the section')).toBeInTheDocument();
      expect(getByText('Block title here')).toBeInTheDocument();
      expect(getByText('Lorem ipsum')).toBeInTheDocument();
    });
  });
});

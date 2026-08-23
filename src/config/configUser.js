/////////////////////////////////////////////////////////
// Configurations related to user.                     //
/////////////////////////////////////////////////////////

// Note: The userFields come from userFields asset nowadays by default.
//       To use this built-in configuration, you need to change the overwrite from configHelper.js
//       (E.g. use mergeDefaultTypesAndFieldsForDebugging func)

/**
 * Configuration options for user fields (custom extended data fields):
 * - key:                           Unique key for the extended data field.
 * - scope (optional):              Scope of the extended data can be either 'public', 'protected', or 'private'.
 *                                  Default value: 'public'.
 * - schemaType (optional):         Schema for this extended data field.
 *                                  This is relevant when rendering components.
 *                                  Possible values: 'enum', 'multi-enum', 'text', 'long', 'boolean'.
 * - enumOptions (optional):        Options shown for 'enum' and 'multi-enum' extended data.
 *                                  These are used to render options for inputs on
 *                                  ProfileSettingsPage and AuthenticationPage.
 * - showConfig:                    Configuration for rendering user information. (How the field should be shown.)
 *   - label:                         Label for the saved data.
 *   - displayInProfile (optional):   Can be used to hide field content from profile page.
 *                                    Default value: true.
 * - saveConfig:                    Configuration for adding and modifying extended data fields.
 *   - label:                         Label for the input field.
 *   - placeholderMessage (optional): Default message for user input.
 *   - isRequired (optional):         Is the field required for users to fill
 *   - requiredMessage (optional):    Message for mandatory fields.
 *   - displayInSignUp (optional):    Can be used to show field input on sign up page.
 *                                    Default value: true.
 * - userTypeConfig:                Configuration for limiting user field to specific user types.
 *   - limitToUserTypeIds:            Can be used to determine whether to limit the field to certain user types. The
 *                                    Console based asset configurations do not yet support user types, so in hosted configurations
 *                                    the default value for this is 'false'.
 *   - userTypeIds:                   An array of user types for which the extended
 *   (optional)                       data is relevant and should be added.
 */
export const userFields = [
  {
    key: 'userType',
    scope: 'public',
    schemaType: 'enum',
    enumOptions: [
      { option: 'homeowner', label: 'Homeowner' },
      { option: 'installer', label: 'Gutter professional' },
    ],
    showConfig: {
      label: 'Account type',
    },
    saveConfig: {
      label: 'I am a',
      displayInSignUp: true,
      isRequired: true,
      placeholderMessage: 'Select account type',
    },
    userTypeConfig: {
      limitToUserTypeIds: false,
      userTypeIds: ['homeowner', 'installer'],
    },
  },
  {
    key: 'companyName',
    scope: 'public',
    schemaType: 'text',
    showConfig: {
      label: 'Company name',
    },
    saveConfig: {
      label: 'Company name',
      displayInSignUp: true,
      isRequired: false,
      placeholderMessage: 'Example: Queen City Gutters',
    },
    userTypeConfig: {
      limitToUserTypeIds: true,
      userTypeIds: ['installer'],
    },
  },
  {
    key: 'providerType',
    scope: 'public',
    schemaType: 'enum',
    enumOptions: [
      { option: 'company', label: 'Gutter company' },
      { option: 'independent-installer', label: 'Independent installer' },
    ],
    showConfig: {
      label: 'Provider type',
    },
    saveConfig: {
      label: 'Provider type',
      displayInSignUp: true,
      isRequired: false,
      placeholderMessage: 'Select provider type',
    },
    userTypeConfig: {
      limitToUserTypeIds: true,
      userTypeIds: ['installer'],
    },
  },
  {
    key: 'licenseAndInsurance',
    scope: 'public',
    schemaType: 'boolean',
    showConfig: {
      label: 'License and insurance available',
    },
    saveConfig: {
      label: 'I can provide license and insurance documentation',
      displayInSignUp: true,
      isRequired: false,
    },
    userTypeConfig: {
      limitToUserTypeIds: true,
      userTypeIds: ['installer'],
    },
  },
  {
    key: 'serviceStates',
    scope: 'public',
    schemaType: 'text',
    showConfig: {
      label: 'Service states',
    },
    saveConfig: {
      label: 'States served',
      displayInSignUp: true,
      isRequired: false,
      placeholderMessage: 'Example: NC, SC, GA',
    },
    userTypeConfig: {
      limitToUserTypeIds: true,
      userTypeIds: ['installer'],
    },
  },
  {
    key: 'serviceRadiusMiles',
    scope: 'public',
    schemaType: 'long',
    numberConfig: {
      minimum: 1,
      maximum: 500,
    },
    showConfig: {
      label: 'Service radius',
    },
    saveConfig: {
      label: 'Service radius in miles',
      displayInSignUp: true,
      isRequired: false,
    },
    userTypeConfig: {
      limitToUserTypeIds: true,
      userTypeIds: ['installer'],
    },
  },
  {
    key: 'homeZip',
    scope: 'protected',
    schemaType: 'text',
    showConfig: {
      label: 'Home ZIP code',
    },
    saveConfig: {
      label: 'Home ZIP code',
      displayInSignUp: true,
      isRequired: false,
      placeholderMessage: 'Example: 28202',
    },
    userTypeConfig: {
      limitToUserTypeIds: true,
      userTypeIds: ['homeowner'],
    },
  },
];

/////////////////////////////////////
// Example user type configuration //
/////////////////////////////////////
/**
 * User types are not supported in hosted configuration yet.
 *
 * To take user types into use in your
 * custom code, you can do the following things:
 * - Add a new user field with key 'userType', scope 'publicData', and schemaType enum
 *  - Consider whether or not you want to allow your users to change their user type after first creating it
 * - Set your user types as the available options for the userType field
 * - Add your user types in the array below
 * - Update configHelpers.js mergeUserConfig to pass user types to the validUserFields function
 */

export const userTypes = [
  {
    userType: 'homeowner',
    label: 'Homeowner',
  },
  {
    userType: 'installer',
    label: 'Gutter professional',
  },
];

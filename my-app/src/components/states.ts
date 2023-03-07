export type USState = // TODO: Enum?
    'Alabama' |
    'Alaska' |
    'Arizona' |
    'Arkansas' |
    'California' |
    'Colorado' |
    'Connecticut' |
    'Delaware' |
    'Florida' |
    'Georgia' |
    'Hawaii' |
    'Idaho' |
    'Illinois' |
    'Indiana' |
    'Iowa' |
    'Kansas' |
    'Kentucky' |
    'Louisiana' |
    'Maine' |
    'Maryland' |
    'Massachusetts' |
    'Michigan' |
    'Minnesota' |
    'Mississippi' |
    'Missouri' |
    'Montana' |
    'Nebraska' |
    'Nevada' |
    'New Hampshire' |
    'New Jersey' |
    'New Mexico' |
    'New York' |
    'North Carolina' |
    'North Dakota' |
    'Ohio' |
    'Oklahoma' |
    'Oregon' |
    'Pennsylvania' |
    'Rhode Island' |
    'South Carolina' |
    'South Dakota' |
    'Tennessee' |
    'Texas' |
    'Utah' |
    'Vermont' |
    'Virginia' |
    'Washington' |
    'West Virginia' |
    'Wisconsin' |
    'Wyoming';

export type USStateShort =
    'AL' |
    'AK' |
    'AZ' |
    'AR' |
    'CA' |
    'CO' |
    'CT' |
    'DE' |
    'FL' |
    'GA' |
    'HI' |
    'ID' |
    'IL' |
    'IN' |
    'IA' |
    'KS' |
    'KY' |
    'LA' |
    'ME' |
    'MD' |
    'MA' |
    'MI' |
    'MN' |
    'MS' |
    'MO' |
    'MT' |
    'NE' |
    'NV' |
    'NH' |
    'NJ' |
    'NM' |
    'NY' |
    'NC' |
    'ND' |
    'OH' |
    'OK' |
    'OR' |
    'PA' |
    'RI' |
    'SC' |
    'SD' |
    'TN' |
    'TX' |
    'UT' |
    'VT' |
    'VA' |
    'WA' |
    'WV' |
    'WI' |
    'WY';


export const us_states: USState[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
];

export const us_states_short: USStateShort[] = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
];

export function stringToUSStateShort(state: string): USStateShort {
    return state.toUpperCase() as USStateShort;
}

export function stringToUSState(state: string): USState {
    return state as USState;
}

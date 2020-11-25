import React from 'react';
import { storiesOf } from '@storybook/react';
import CountryLookup from './CountryLookup';
import CountryLookupDropdown from './CountryLookupDropdown';

storiesOf('CountryLookup', module)
  .add('default', () => (
    <div className="w-25">
      <CountryLookup />
    </div>
  ))
  .add('CountryLookupDropdown', () => (
    <div className="w-25">
      <CountryLookupDropdown countryCode="VNM" />
    </div>
  ))
  .add('CountryLookupDropdown readonly', () => (
    <div className="w-25">
      <CountryLookupDropdown countryCode="VNM" readonly={true} />
    </div>
  ));

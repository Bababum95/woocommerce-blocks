/**
 * External dependencies
 */
import { isValidElement } from '@wordpress/element';
import type { ReactElement } from 'react';
/**
 * Internal dependencies
 */
import FormattedMonetaryAmount from '../../../../components/formatted-monetary-amount';
import { TotalsItemProps } from './index';

const TotalsItemValue = ( {
	value,
	currency,
}: Partial< TotalsItemProps > ): ReactElement | null => {
	if ( isValidElement( value ) ) {
		return (
			<div className="wc-block-components-totals-item__value">
				{ value }
			</div>
		);
	}

	return Number.isFinite( value ) ? (
		<FormattedMonetaryAmount
			className="wc-block-components-totals-item__value"
			currency={ currency || {} }
			value={ value as number }
		/>
	) : null;
};

export default TotalsItemValue;

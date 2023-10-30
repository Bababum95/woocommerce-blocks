/**
 * External dependencies
 */
import classnames from 'classnames';
import { getSetting } from '@woocommerce/settings';
import type { Currency } from '@woocommerce/price-format';
import type { CartTotalsTaxLineItem } from '@woocommerce/types';
import type { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import TotalsItem from '../item';

interface Values {
	tax_lines: CartTotalsTaxLineItem[];
	total_tax: string;
}

export interface TotalsTaxesProps {
	className?: string;
	currency: Currency;
	showRateAfterTaxName: boolean;
	values: Values | Record< string, never >;
}

const TotalsTaxes = ( {
	currency,
	values,
	className,
}: TotalsTaxesProps ): ReactElement | null => {
	const { total_tax: totalTax, tax_lines: taxLines } = values;

	if (
		! getSetting( 'taxesEnabled', true ) &&
		parseInt( totalTax, 10 ) <= 0
	) {
		return null;
	}

	const showItemisedTaxes = getSetting(
		'displayItemizedTaxes',
		false
	) as boolean;

	const itemisedTaxItems: ReactElement | null =
		showItemisedTaxes && taxLines.length > 0 ? (
			<>
				{ taxLines.map( ( { price }, i ) => {
					return (
						<TotalsItem
							key={ `tax-line-${ i }` }
							className={ classnames(
								'wc-block-components-totals-taxes',
								className
							) }
							currency={ currency }
							label={ 'inkl. 19 % MwSt.' }
							value={ parseInt( price, 10 ) }
						/>
					);
				} ) }{ ' ' }
			</>
		) : null;

	return showItemisedTaxes ? (
		itemisedTaxItems
	) : (
		<>
			<TotalsItem
				className={ classnames(
					'wc-block-components-totals-taxes',
					className
				) }
				currency={ currency }
				label={ 'inkl. 19 % MwSt.' }
				value={ parseInt( totalTax, 10 ) }
				description={ null }
			/>
		</>
	);
};

export default TotalsTaxes;

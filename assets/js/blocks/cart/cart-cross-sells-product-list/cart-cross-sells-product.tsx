/**
 * External dependencies
 */
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { ProductResponseItem } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { Block as ProductImage } from '../../../atomic/blocks/product-elements/image/block';
import { Block as ProductName } from '../../../atomic/blocks/product-elements/title/block';
import { Block as ProductPrice } from '../../../atomic/blocks/product-elements/price/block';
import { Block as ProductButton } from '../../../atomic/blocks/product-elements/button/block';
import { ImageSizing } from '../../../atomic/blocks/product-elements/image/types';

interface CrossSellsProductProps {
	product: ProductResponseItem;
	isLoading: boolean;
}

const CartCrossSellsProduct = ( {
	product,
}: CrossSellsProductProps ): JSX.Element => {
	return (
		<div className="cross-sells-product">
			<InnerBlockLayoutContextProvider
				parentName={ 'woocommerce/cart-cross-sells-block' }
				parentClassName={ 'wp-block-cart-cross-sells-product' }
			>
				<ProductDataContextProvider
					// Setting isLoading to false, given this parameter is required.
					isLoading={ false }
					product={ {
						...product,
						name: `${ product.name } ${ product.variation
							.split( ', ' )
							.map( ( part ) => part.split( ': ' )[ 1 ] )
							.filter( Boolean )
							.join( ' ' ) }`,
					} }
				>
					<div>
						<ProductImage
							className={ '' }
							showSaleBadge={ false }
							productId={ product.id }
							showProductLink={ false }
							saleBadgeAlign={ 'left' }
							imageSizing={ ImageSizing.SINGLE }
							isDescendentOfQueryLoop={ false }
							scale={ 'cover' }
							aspectRatio={ '' }
						/>
						<ProductName
							align={ 'left' }
							headingLevel={ 3 }
							showProductLink={ false }
						/>
					</div>
					<div className="cross-sells-product__bottom">
						<ProductPrice textAlign="left" />
						<ProductButton />
					</div>
				</ProductDataContextProvider>
			</InnerBlockLayoutContextProvider>
		</div>
	);
};

export default CartCrossSellsProduct;

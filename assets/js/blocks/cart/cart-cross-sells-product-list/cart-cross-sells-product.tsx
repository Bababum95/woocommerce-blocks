/**
 * External dependencies
 */
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import classNames from 'classnames';
import { ProductResponseItem } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { Block as ProductImage } from '../../../atomic/blocks/product-elements/image/block';
import { Block as ProductPrice } from '../../../atomic/blocks/product-elements/price/block';
import { Block as ProductButton } from '../../../atomic/blocks/product-elements/button/block';
import { ImageSizing } from '../../../atomic/blocks/product-elements/image/types';

interface CrossSellsProductProps {
	product: ProductResponseItem;
	isLoading: boolean;
}

interface IBadgesProps {
	onSale: boolean;
	inStock: boolean;
	nikotinfrai: boolean;
}

const cleanUrl = ( url: string ) => {
	const parts = url.split( '?' );
	if ( parts.length > 1 ) {
		return parts[ 0 ];
	}
	return url;
};

const Badges = ( { onSale, inStock, nikotinfrai }: IBadgesProps ) => {
	if ( ! onSale && inStock && ! nikotinfrai ) {
		return null;
	}

	return (
		<div className="wp-block-woocommerce-product-badge">
			{ nikotinfrai && (
				<span className="wc-block-components-product-badge__nikotinfrai" />
			) }
			{ ! inStock && (
				<span className="wc-block-components-product-badge__out-of-stock" />
			) }
			{ onSale && inStock && (
				<span className="wc-block-components-product-badge__sale" />
			) }
		</div>
	);
};

const CartCrossSellsProduct = ( {
	product,
}: CrossSellsProductProps ): JSX.Element => {
	return (
		<div className="glimp-product-card">
			<InnerBlockLayoutContextProvider
				parentName={ 'woocommerce/cart-cross-sells-block' }
				parentClassName={ 'wp-block-cart-cross-sells-product' }
			>
				<ProductDataContextProvider
					// Setting isLoading to false, given this parameter is required.
					isLoading={ false }
					product={ product }
				>
					<a
						href={ cleanUrl( product.permalink ) }
						className="glimp-product-card__link"
						title={ product.name }
					>
						<ProductImage
							className={ 'glimp-product-card__image' }
							showSaleBadge={ false }
							productId={ product.id }
							showProductLink={ false }
							saleBadgeAlign={ 'left' }
							imageSizing={ ImageSizing.SINGLE }
							isDescendentOfQueryLoop={ false }
						/>
						<div className="glimp-product-card__info">
							<div className="glimp-product-card__top">
								{ Number( product.average_rating ) > 0 && (
									<span
										className="glimp-product-card__rating"
										data-rating={ product.average_rating.substring(
											0,
											3
										) }
									/>
								) }
								{ /* <button
									className="add-to-favorites"
									data-id={ product.id }
								>
									<svg
										width="32px"
										height="32px"
										viewBox="0 0 20.00 20.00"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										stroke="#000000"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M10 6.49228C11.4641 3.87207 16.5 4.78701 16.5 8.57245C16.5 11.1012 14.3333 13.4103 10 15.5C5.66667 13.4103 3.5 11.1012 3.5 8.57245C3.5 4.78701 8.5359 3.87207 10 6.49228Z"
											fill="none"
										/>
									</svg>
								</button> */ }
							</div>
							<Badges
								onSale={ product.on_sale }
								inStock={ product.is_in_stock }
								nikotinfrai={
									!! product.tags.find(
										( tag ) =>
											tag.slug ===
											'einweg-e-zigarette-ohne-nikotin'
									)
								}
							/>
							<h3 className="glimp-product-card__title">
								{ product.name }
							</h3>
							<div className="glimp-product-card__bottom">
								<ProductPrice className="glimp-product-card__price" />
								<ProductButton
									className={ classNames(
										'glimp-product-card__button',
										{
											'out-of-stock':
												product.is_in_stock === false,
										}
									) }
								/>
							</div>
						</div>
					</a>
				</ProductDataContextProvider>
			</InnerBlockLayoutContextProvider>
		</div>
	);
};

export default CartCrossSellsProduct;

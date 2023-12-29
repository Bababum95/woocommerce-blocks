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
	console.log( product );
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

// type ClassNames = {
//     [key in 'simple' | 'big']: {
//         card: string,
//         bottom: string,
//         rating: string,
//         button: string
//     };
// };

// const buttonContent = {
//     simple: {
//         variable:   `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="2" viewBox="0 0 8 2" fill="none">
//                         <path d="M2 1L-7.45058e-09 1" stroke="#9C48F7" stroke-width="1.5"/>
//                         <path d="M5 1L3 1" stroke="#9C48F7" stroke-width="1.5"/>
//                         <path d="M8 1L6 1" stroke="#9C48F7" stroke-width="1.5"/>
//                     </svg>`,
//         single: '+'
//     },
//     big: {
//         variable:   `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="2" viewBox="0 0 8 2" fill="none">
//                         <path d="M2 1L-7.45058e-09 1" stroke="#9C48F7" stroke-width="1.5"/>
//                         <path d="M5 1L3 1" stroke="#9C48F7" stroke-width="1.5"/>
//                         <path d="M8 1L6 1" stroke="#9C48F7" stroke-width="1.5"/>
//                     </svg>`,
//         single: 'In den Warenkorb'
//     },
//     like:   `<svg width="32px" height="32px" viewBox="0 0 20.00 20.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
//                 <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6.49228C11.4641 3.87207 16.5 4.78701 16.5 8.57245C16.5 11.1012 14.3333 13.4103 10 15.5C5.66667 13.4103 3.5 11.1012 3.5 8.57245C3.5 4.78701 8.5359 3.87207 10 6.49228Z" fill="none"/>
//             </svg>`
// }

// const classNames: ClassNames = {
//     simple: {
//         card: 'glimp-product-card',
//         bottom: 'glimp-product-card__bottom',
//         rating: 'glimp-product-card__rating',
//         button: 'glimp-product-card__button',
//     },
//     big: {
//         card: 'glimp-product-big-card',
//         bottom: 'glimp-product-big-card__main',
//         rating: 'glimp-product-big-card__rating',
//         button: 'glimp-product-big-card__button',
//     }
// }

// const getAddToFavoritesButton = (data: IProductData): HTMLElement => {
//     const button = document.createElement('button');
//     button.className = `add-to-favorites${data.is_favorite ? ' active' : ''}`;
//     button.dataset.id = data.id.toString();
//     button.innerHTML = buttonContent.like;

//     return button;
// };

// const getPrice = (data: IProductData): HTMLElement => {
//     const priceSpan = document.createElement('span');
//     priceSpan.className = 'glimp-product-card__price';
//     if (data.is_on_sale) {
//         const originalPrice = document.createElement('del');
//         originalPrice.innerHTML = `<span class="woocommerce-Price-amount amount">
//                                     <bdi>
//                                         ${data.regular_price.replace('.', ',')} <!-- Заменяем точку на запятую -->
//                                         <span class="woocommerce-Price-currencySymbol">€</span>
//                                     </bdi>
//                                  </span>`;
//         priceSpan.appendChild(originalPrice);
//     }

//     const salePrice = document.createElement('ins');
//     salePrice.innerHTML = `<span class="woocommerce-Price-amount amount">
//                             <bdi>
//                                 ${data.price.replace('.', ',')} <!-- Заменяем точку на запятую -->
//                                 <span class="woocommerce-Price-currencySymbol">€</span>
//                             </bdi>
//                           </span>`;
//     priceSpan.appendChild(salePrice);

//     return priceSpan;
// }

// const getBadges = (data: IProductData): HTMLElement => {
//     const badgesDiv = document.createElement('div');
//     badgesDiv.className = 'wp-block-woocommerce-product-badge';

//     if (!data.is_in_stock) {
//         const inStockBadge = document.createElement('span');
//         inStockBadge.className = 'wc-block-components-product-badge__out-of-stock';
//         badgesDiv.appendChild(inStockBadge);
//     }

//     if (data.nikotinfrai) {
//         const nikotinfraiBadge = document.createElement('span');
//         nikotinfraiBadge.className = 'wc-block-components-product-badge__nikotinfrai';
//         badgesDiv.appendChild(nikotinfraiBadge);
//     }

//     if (data.is_on_sale && data.is_in_stock) {
//         const onSaleBadge = document.createElement('span');
//         onSaleBadge.className = 'wc-block-components-product-badge__sale';
//         badgesDiv.appendChild(onSaleBadge);
//     }
//     return badgesDiv;
// }

// const getCardTop = (data: IProductData, type: CardType) => {
//     const cardTop = type === 'simple'? document.createElement('div') : document.createDocumentFragment();
//     if(cardTop instanceof HTMLDivElement) cardTop.className = 'glimp-product-card__top';

//     if (data.rating != '0') {
//         const ratingBadge = document.createElement('span');
//         ratingBadge.className = classNames[type].rating;
//         ratingBadge.dataset.rating = parseFloat(data.rating).toFixed(1);
//         cardTop.appendChild(ratingBadge);
//     }

//     const addToFavoritesButton = getAddToFavoritesButton(data)

//     cardTop.appendChild(addToFavoritesButton);

//     return cardTop;
// }

// const getInfo = (data: IProductData, type: CardType): HTMLElement => {
//     const defaultClass = classNames[type].card;

//     const infoDiv = document.createElement('div');
//     infoDiv.className = `${defaultClass}__info`;

//     const cardTop = getCardTop(data, type);

//     const titleH3 = document.createElement('h3');
//     titleH3.className = `${defaultClass}__title`;
//     titleH3.textContent = data.name;

//     const bottomDiv = document.createElement('div');
//     bottomDiv.className = classNames[type].bottom;

//     const priceSpan = getPrice(data);
//     const button = getAddToCartButton(data, type);
//     const badges = getBadges(data);
//     const cardRight = type === 'big'? document.createElement('div') : document.createDocumentFragment();
//     if (cardRight instanceof HTMLDivElement) cardRight.className = 'glimp-product-big-card__right';

//     if (type === 'big') {
//         infoDiv.appendChild(titleH3);
//         const cardLeft = document.createElement('div');
//         cardLeft.className = 'glimp-product-big-card__left';
//         if (data.table) {
//             const tables = generateTables(data.table);
//             tables.forEach((table) => {
//                 cardLeft.appendChild(table);
//             })
//         }

//         bottomDiv.appendChild(cardLeft);
//     }

//     if (badges.hasChildNodes()) {
//         infoDiv.appendChild(badges);
//     }

//     infoDiv.appendChild(cardTop);

//     if (type === 'simple') {
//         infoDiv.appendChild(titleH3);
//     }

//     cardRight.appendChild(priceSpan);
//     cardRight.appendChild(button);
//     bottomDiv.appendChild(cardRight);
//     infoDiv.appendChild(bottomDiv);

//     return infoDiv;
// }

// export function createProductCard(data: IProductData, type: CardType = 'simple'): HTMLElement {
//     const article = document.createElement('article');
//     const defaultClass = classNames[type].card;
//     article.className = defaultClass;

//     const anchor = document.createElement('a');
//     anchor.href = data.link;
//     anchor.className = `${defaultClass}__link`;
//     anchor.title = data.name;

//     const image = getImage(data.image[0], data.name, defaultClass);
//     const infoDiv = getInfo(data, type);

//     anchor.appendChild(image);
//     anchor.appendChild(infoDiv);
//     article.appendChild(anchor);

//     return article;
// }

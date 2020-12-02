import { useEffect, useRef, useState } from 'react';
import './App.css';

import LeftArrow from '../src/assets/left-arrow.svg';
import RightArrow from '../src/assets/right-arrow.svg';


const ImageSlider = ({ images, alt, className, imgClassName }: { images: string[]; alt?: string; className?: string; imgClassName?: string; }) => {
  const [index, setIndex] = useState(0),
    slideRight = () => {
      setIndex((index + 1) % images.length);
    },
    slideLeft = () => {
      const nextIndex = index - 1;
      if (nextIndex < 0) setIndex(images.length - 1);
      else setIndex(nextIndex);
    };


  function Img({ src }: { src: string; }) {
    const [loaded, setLoaded] = useState(false),
      [error, setError] = useState(false);

    return (
      <div className="Img">
        <img onLoad={e => setLoaded(true)} onError={e => setError(true)} className={`ImageSlider__image ${imgClassName}`} src={`${images[index]}${index ? Array(index).fill('/').join('') : ''}`} alt={alt} />
        {!loaded &&
          <div className="Img__loading">
            Loading...
          </div>
        }
        {error &&
          <div className="Img__error">
            Hmm. This image is broken.
          </div>
        }
      </div>
    )
  }

  // Force update when image URL is the same by appending backslashes
  return (
    <div className={`ImageSlider ${className}`}>

      <img src={LeftArrow} alt="left-arrow" className="ImageSlider__arrow" onClick={slideLeft} />

      <Img src={images[index]} />

      <img src={RightArrow} alt="left-arrow" className="ImageSlider__arrow" onClick={slideRight} />

    </div>
  );
};

interface Product {
  [key: string]: any;
}

interface ProductVariant {
  [key: string]: any;
}

export const ProductVariants = ({ variants, className }: { variants: ProductVariant[]; className?: string }) => (
  <div className={`ProductVariants ${className}`}>
    {
      variants.map(variant => (
        <div className="product-variant" key={variant.id}>
          <div className="product-variant__header">
            <h6 className="product-variant__title">{variant.title}</h6>
          </div>
          <div className="product-variant__body">
            <div className="product-variant__quantity">Quantity: {variant.quantity}</div>
            <div className="product-variant__sku">SKU:
              <code className="code">{variant.sku}</code>
            </div>
          </div>
        </div>
      ))
    }
  </div>
);


export const Products = ({ url: _url }: { url: string; }) => {
  const [url] = useState(_url),
    [products, setProducts] = useState({ buffered: [] as Product[], displayed: [] as Product[] }),
    [page, setPage] = useState(1),
    [showLoadingText, setShowLoadingText] = useState(true),
    loader = useRef(null as any),
    [variantsPresent, setVariantsPresent] = useState({} as { [key: string]: boolean; });

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then((buffered: Product[]) => {
        const displayed = buffered.splice(0, 5);
        setProducts({
          buffered,
          displayed
        });
      });

    const observer = new IntersectionObserver(([target]) => target.isIntersecting ? setPage(page => page + 1) : false, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });
    if (loader.current) observer.observe(loader.current);
  }, [url]);

  useEffect(() => {
    setProducts(({ buffered, displayed: prevDisplayed }) => {
      const displayed = prevDisplayed.concat(buffered.splice(0, 5));
      if (!buffered.length) setShowLoadingText(false);
      return { buffered, displayed };
    });
  }, [page]);

  function toggleVariants(id: string) {
    setVariantsPresent(variants => ({ ...variants, [id]: !variants[id] }));
  }

  return (
    <div className="Products">
      {
        products.displayed.map(item => (
          <div className="product" key={item.id}>
            <div className="product__header">
              <h3 className="product__title">{item.title}</h3>
              <div className="product__price">${item.price}</div>
            </div>
            <div className="product__body">
              <div className="product__text">
                <p className="product__description">{item.description}</p>
                <div className="product__tags">{item.tags.join(", ")}</div>
              </div>
              <div className="product__media">
                <ImageSlider images={item.images} alt={item.title} imgClassName="product__image" />
              </div>
            </div>
            {variantsPresent[item.id] ?
              <>
                <div className="product__variants-button-container">
                  <button className="product__variants-button" onClick={e => toggleVariants(item.id)}>Hide variants</button>
                </div>
                <ProductVariants variants={item.variants} className="product__variants" />
              </>
              :
              <div className="product__variants-button-container">
                <button className="product__variants-button" onClick={e => toggleVariants(item.id)}>Show {item.variants.length} variants</button>
              </div>
            }

          </div>
        ))
      }
      <div className="loader" ref={loader}>
        {showLoadingText &&
          <div className="loadingText">
            Loading...
        </div>
        }
      </div>
    </div>
  );
}

export const App = () => {
  const url = process.env.REACT_APP_PRODUCTS_URL;
  if (!url) throw new Error(`REACT_APP_PRODUCTS_URL is not defined. Edit the .env file in the root of your project.`);

  return (<div className="App">
    { Products({ url })}
  </div>)
}

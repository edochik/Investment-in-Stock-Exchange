import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import s from "./Cart.module.scss";
import { removeCompanyFromCart } from "../../redux/cartSlice/cartSlice";
import classNames from "classnames";
import { RenderLogo } from "../RenderLogo/RenderLogo";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cart = useAppSelector((state) => state.cart);
  const securities = useAppSelector((state) => state.data.data!.securities);

  const dispatch = useAppDispatch();

  const onClickRemoveCompany = (secid: string) => {
    dispatch(removeCompanyFromCart(secid));
  };

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const scroll = () => {
      setIsOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("scroll", scroll);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.addEventListener("scroll", scroll);
    };
  }, []);

  return (
    <div className={s.Cart} ref={ref}>
      <button
        className={s.button}
        onClick={() => setIsOpen(!isOpen)}
        disabled={cart.length === 0}
      >
        🛒{cart.length}
      </button>
      {isOpen && (
        <ul
          className={classNames({
            [s.list]: true,
            [s.hidden]: cart.length === 0,
          })}
        >
          {cart.map((item) => {
            const { secid, shortname } = securities[item];
            return (
              <li className={s.item} key={secid}>
                <div className={s.inner}>
                  <RenderLogo secid={secid} shortname={shortname} />
                  <p className={s.text}>{secid}</p>
                </div>
                <p className={s.text}>{shortname}</p>
                <button
                  className={s.button}
                  onClick={() => onClickRemoveCompany(secid)}
                >
                  📓
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export { Cart };

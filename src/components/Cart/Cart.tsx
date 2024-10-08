import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import s from "./Cart.module.scss";
import { addImoex } from "../../redux/initialDataSlice/initialDataSlice";
import { addNonImoex } from "../../redux/nonImoexCompanySlice/nonImoexCompanySlice";
import { removeCompanyCart } from "../../redux/cartSlice/cartSlice";
import classNames from "classnames";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const onClickRemoveCart = (secids: string) => {
    const company = cart.find((item) => item.secids === secids);
    dispatch(addImoex(company));
    dispatch(addNonImoex(company));
    dispatch(removeCompanyCart(secids));
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
            const { secids, indexid, shortnames } = item;
            return (
              <li className={s.item} key={secids}>
                <p className={s.text}>{indexid}</p>
                <p className={s.text}>{secids}</p>
                <p className={s.text}>{shortnames}</p>
                <button
                  className={s.button}
                  onClick={() => onClickRemoveCart(secids)}
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

import { useEffect, useState } from "react";
import logo from "../../assets/movieLogo.svg";
import style from "./Header.module.scss";

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  const handleScroll = () => {
    const prevScrollPositionCopy = prevScrollPos;

    const currentScrollPos = window.scrollY;
    const newVisibleData = prevScrollPositionCopy > currentScrollPos;

    setPrevScrollPos(currentScrollPos);
    setVisible(newVisibleData);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`${style.header} ${!visible ? style["header--hidden"] : ""}`}
    >
      <a className={style.header__logo} href="/">
        <img src={logo} alt="Logo" />
      </a>
      <div className={style.header__links}>
        <a href="/">Movies</a>
        <a href="/">TV Shows</a>
        <a href="/">People</a>
        <a href="/">More</a>
      </div>
    </div>
  );
};

export default Header;

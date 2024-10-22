import s from "./RenderLogo.module.scss";
import { useState } from "react";

interface RenderLogoProps {
  secid: string;
  shortname: string;
}

const RenderLogo = ({ secid, shortname }: RenderLogoProps) => {
  const [isLoaded, setIsLoaded] = useState(true);
  if (isLoaded) {
    return (
      <img
        className={s.image}
        src={`${process.env.PUBLIC_URL}/images/${secid}.svg`}
        onError={() => setIsLoaded(false)}
        alt={`логотип ${shortname}`}
      />
    );
  }
  return <p className={s.non_image}> {secid[0]} </p>;
};

export { RenderLogo };


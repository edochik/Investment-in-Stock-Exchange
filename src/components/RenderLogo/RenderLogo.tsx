import { securityHasSvg } from "./securityHasSvg";
import s from "./RenderLogo.module.scss";

interface RenderLogoProps {
  secid: string;
  shortname: string;
}
const RenderLogo = ({ secid, shortname }: RenderLogoProps) => {
  if (!securityHasSvg[secid]) {
    return <p className={s.non_image}> {secid[0]} </p>;
  }
  return (
    <img
      className={s.image}
      src={`${process.env.PUBLIC_URL}/images/${secid}.svg`}
      alt={`логотип ${shortname}`}
    />
  );
};

export { RenderLogo };

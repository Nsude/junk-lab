import {gsap} from "gsap"
import useMousePos from "../../hooks/useMousePos"
import { useGlobalContext } from "../../contexts/globalContext";
import { useRef, useState } from "react";
import LinkArrow from "../../assets/fonts/icons/LinkArrow";
import useCustomEffect from "../../hooks/useCustomEffect";

interface Props {
  arrowIcon?: boolean,
  text?: string,
  bg?: string, // bg color
  overlay?: string, // overlay color
  fg?: string, // text color after overlay
  defaultColor?: string //default text color
}

const ButtonSolidOverlay:React.FC<Props> = ({arrowIcon, text, bg, overlay, fg, defaultColor}) => {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const linkArrowRef = useRef<HTMLSpanElement | null>(null)
  
  const mousePos = useMousePos();
  const {colors} = useGlobalContext();
  const [arrowColor, setArrowColor] = useState(colors.black)

  
  useCustomEffect(() => {
    if (!buttonRef.current) return;

    bg ? buttonRef.current.style.setProperty("--bg", `${bg}`) : "";
    fg ? buttonRef.current.style.setProperty("--fg", `${fg}`) : "";
    overlay ? buttonRef.current.style.setProperty("--overlay", `${overlay}`) : "";
  }, [])

  const getRelativePos = () => {
    const button = buttonRef.current;
    if (!button) return {rX: 0, rY: 0};
    
    const rect = button.getBoundingClientRect();
    const rX = mousePos.x - rect.left;
    const rY = mousePos.y - rect.top;
    return {rX, rY};
  }

  const growOverlay = () => {
    const { rX, rY } = getRelativePos();

    gsap.to(spanRef.current, {
      clipPath: `circle(0% at ${rX}px ${rY}px)`,
      duration: 0
    })

    // animate arrow icon
    setArrowColor(fg || colors.aliceBlue);
    const arrowTl = gsap.timeline();
    arrowTl.to(linkArrowRef.current, {
      xPercent: 100, 
      yPercent: -100,
      duration: .1
    })

    arrowTl.to(linkArrowRef.current, {
      xPercent: -100,
      yPercent: 100,
      duration: 0
    })

    arrowTl.to(linkArrowRef.current, {
      xPercent: 0,
      yPercent: 0,
      duration: .1
    })

    gsap.to(textRef.current, {
      color: fg || colors.aliceBlue,
      duration: 0
    })

    gsap.to(spanRef.current, {
      clipPath: `circle(110% at ${rX}px ${rY}px)`,
      duration: .3
    })
  }

  const moveOverlay = () => {
    const { rX, rY } = getRelativePos();

    gsap.to(textRef.current, {
      color: fg || colors.aliceBlue,
      duration: 0
    })

    gsap.to(spanRef.current, {
      clipPath: `circle(110% at ${rX}px ${rY}px)`,
      duration: .3
    })
  }

  const shrinkOverlay = () => {
    const { rX, rY } = getRelativePos();

    gsap.to(textRef.current, {
      color: defaultColor || colors.black
    })

    // animate arrow icon
    setArrowColor(defaultColor || colors.black);
    const arrowTl = gsap.timeline();
    arrowTl.to(linkArrowRef.current, {
      xPercent: -100, 
      yPercent: 100,
      duration: .1
    })

    arrowTl.to(linkArrowRef.current, {
      xPercent: 100,
      yPercent: -100,
      duration: 0
    })

    arrowTl.to(linkArrowRef.current, {
      xPercent: 0,
      yPercent: 0,
      duration: .1
    })

    gsap.to(spanRef.current, {
      clipPath: `circle(0% at ${rX}px ${rY}px)`,
      delay: 0
    })
  }
  
  return (
    <button ref={(el) => buttonRef.current = el} className="button-solid-overlay flex cg-10" onMouseEnter={() => growOverlay()} onMouseMove={() => moveOverlay()} onMouseLeave={() => {shrinkOverlay()}}>
      { arrowIcon ? 
        <div className="arrow-con"> 
          <div ref={(el) => linkArrowRef.current = el}> <LinkArrow size={18.5} color={arrowColor}/> </div>
        </div> : ""}
      <span ref={(el) => textRef.current = el}>{ text || "Get Started" }</span>
      <span ref={(el) => spanRef.current = el} className="overlay"></span>
    </button>
  )
}

export default ButtonSolidOverlay;
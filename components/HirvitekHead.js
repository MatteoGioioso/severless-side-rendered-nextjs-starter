import {colors} from "./Styled/vars";

const HirvitekHead = props => {
  const styles = {
    stroke: props.color || colors.whitebg,
    fill: props.color || colors.whitebg
  };

  return (
    <svg
      // style={{ width: "15%" }}
      className="hirvitek-head"
      baseProfile="tiny"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 -110 293.3 350"
    >
      <g>
        <g>
          <path
            fill="none"
            stroke={styles.stroke}
            strokeWidth={styles.strokeWidth}
            strokeMiterlimit="10"
            d="M121.7,172.2c-0.2-6.8,6.7-7.8,8.2-9
            c1.5-1.2,0-4.7,0-4.7c-56.5,1.2-60.2-86-6.2-96.5c0,0-53.4,32.4-9.8,86c0,0-9.8-15.8-1-34.2c0,0,1.5,36,27,38s-14.4-6.2,6.2-43.2
            c-8.6,18,23.6,72.3,42.2-8.2c0,0,2.7,24.7-4,36c0,0,27.3,4.7,36-44c0,0,4,16,0,26c-2.2,6,36.5-12,31-75.8
            c0,0,47.5,89.5-75.5,105.5c0,0-12.3,2.3-13.2,16s-10.2-1.9-15.3-0.2c-2.9,0.9-5.8,3.2-9.5,7.6c0,0-31.6-0.7-32,5
            c-0.4,5.7,0,8.7,0,8.7h12"
          />
          <path
            fill="none"
            stroke={styles.stroke}
            strokeWidth={styles.strokeWidth}
            strokeMiterlimit="10"
            d="M120.2,191.8h-14c0,0,0,6.2,0,9.2
            c107.3,21.7,14,27.7-31.5,44.3c30-7.2,89.3-30.8,110,36.3c0,0-3.5-63.5-25.5-81.5c0,0,4.8,4.9,6.3,4.3c15-6-4-44.2,37-50.2
            c-10.5-1.7-36,1-41.2,40.7c0,0-0.5,11.4-15.1,6.6s-26.6-6.4-28-6S118.4,192.9,120.2,191.8z"
          />
          <path
            stroke={styles.stroke}
            strokeWidth={styles.strokeWidth}
            strokeMiterlimit="10"
            d="M152.6,177c-4.5-1-9,0-9,0S148.5,171.6,152.6,177z"
          />
          <path
            fill="none"
            stroke={styles.stroke}
            strokeWidth={styles.strokeWidth}
            strokeMiterlimit="10"
            d="M175.7,202.3c0,0,40,54.3,9.3,99C182.7,304,212.7,264.5,175.7,202.3z"
          />
          <path
            fill="none"
            stroke={styles.stroke}
            strokeWidth={styles.strokeWidth}
            strokeMiterlimit="10"
            d="M172.9,185.7c0,0,54.9,28.6,28.5,94l-3.2,7.2c0,0,27.3-64.7-25.4-99.3V185.7z"
          />
        </g>
      </g>
    </svg>
  );
};

export default HirvitekHead;

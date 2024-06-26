import { motion } from "framer-motion";

import { styles } from "../../lib/styles";
import { staggerContainer } from "../../lib/motions";

export const SectionWrapper = (Component:any, idName:string) =>
  function HOC(props:any) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0 `}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component {...props}/>
      </motion.section>
    );
  };

// ------------ YEAR 1 ------------
import programming_basics from "./1Year/programming_baiscs";
import calculus from "./1Year/calculus";
import digital_logic from "./1Year/digital_logic";
import linux from "./1Year/linux";
import math from "./1Year/math";

export const Year1 = {
  subjects: {
    programming_basics,
    calculus,
    digital_logic,
    linux,
    math,
  },

  resources: {
    pdf: {
      programming_basics: "/guides/1Year/resources/pdf/programming_basics.pdf",
      calculus: "/guides/1Year/resources/pdf/calculus.pdf",
      // add more here
    },
    ppt: {},
    other: {},
  },
};


// ------------ YEAR 2 ------------
import dbms from "./2Year/dbms";
import dsa from "./2Year/dsa";
import networks from "./2Year/networks";
import oop from "./2Year/oop";
import web_basics from "./2Year/web_basics";

export const Year2 = {
  subjects: { dbms, dsa, networks, oop, web_basics },
  resources: { pdf: {}, ppt: {}, other: {} }
};


// ------------ YEAR 3 ------------
import advanced_networks from "./3Year/advanced_netwroks";
import backend_services from "./3Year/backend_services";
import cloud from "./3Year/cloud";
import ml_basics from "./3Year/ml_basics";
import operating_systems from "./3Year/operating_systems";

export const Year3 = {
  subjects: { advanced_networks, backend_services, cloud, ml_basics, operating_systems },
  resources: { pdf: {}, ppt: {}, other: {} }
};


// ------------ YEAR 4 ------------
import advanced_db from "./4Year/adavnced_db";
import devops from "./4Year/devops";
import distributed_systems from "./4Year/distributed_systems";
import interview_prep from "./4Year/interview_prep";
import security from "./4Year/security";

export const Year4 = {
  subjects: { advanced_db, devops, distributed_systems, interview_prep, security },
  resources: { pdf: {}, ppt: {}, other: {} }
};


// ------------ EXPORT ALL ------------
export const YEARS = { Year1, Year2, Year3, Year4 };

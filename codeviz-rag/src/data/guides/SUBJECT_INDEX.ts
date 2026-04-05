import calculus from "./1Year/calculus";
import digital_logic from "./1Year/digital_logic";
import linux from "./1Year/linux";
import math from "./1Year/math";
import programming_basics from "./1Year/programming_baiscs";


import dbms from "./2Year/dbms";
import dsa from "./2Year/dsa";
import networks from "./2Year/networks";
import oop from "./2Year/oop";
import web_basics from "./2Year/web_basics";



import advanced_networks from "./3Year/advanced_netwroks";
import backend_services from "./3Year/backend_services";
import cloud from "./3Year/cloud";
import ml_basics from "./3Year/ml_basics";
import operating_systems from "./3Year/operating_systems";


import advanced_db from "./4Year/adavnced_db";
import devops from "./4Year/devops";
import distributed_systems from "./4Year/distributed_systems";
import interview_prep from "./4Year/interview_prep";
import security from "./4Year/security";

export const SUBJECT_DATA: Record<string, any> = {
  // 1st Year
  "Calculus": calculus,
  "Digital Logic": digital_logic,
  "Linux": linux,
  "Discrete Math": math,
  "Programming Basics": programming_basics,

    // 2nd Year
  "DBMS": dbms,
  "DSA": dsa,
  "Networks": networks,
  "OOP": oop,
  "Web Basics": web_basics,


    // 3rd Year
  "Advanced Networks": advanced_networks,
  "Backend Services": backend_services,
  "Cloud": cloud,
  "ML Basics": ml_basics,
  "Operating Systems": operating_systems,


    // 4th Year
  "Advanced DB": advanced_db,
  "DevOps": devops,
  "Distributed Systems": distributed_systems,
  "Interview Prep": interview_prep,
  "Security": security,
};
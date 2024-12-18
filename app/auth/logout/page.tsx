'use client'

import {logOut} from "./actions";
import {useEffect} from "react";

export default function Page() {
  useEffect(() => {
    logOut();
  })

}
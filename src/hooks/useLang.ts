import { useState } from "react"
import pt from "../strings/pt.json"
import en from "../strings/en.json"

export const useLang = () => {

    const [lang, setLang] = useState(navigator.language.startsWith("pt") ? pt : en);

    return {
        lang,
        setLang
    }

}
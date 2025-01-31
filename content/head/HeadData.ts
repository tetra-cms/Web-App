import type IHeaderData from "~/types/head/HeaderData";
import type ISeoData from "~/types/head/SeoData";

export let HeadData = {
    title: "Феникс — купить бумагу оптом от производителя в городе Тольятти",
    description: "Вы можете купить бумагу в Тольятти гарантированно высокого качества по доступным ценам. С компанией Феникс это удобно и выгодно — мы не завышаем цены и полностью контролируем все этапы производства любой целлюлозной бумаги!",
} as IHeaderData;

export let SeoData = {
    ogTitle: HeadData.title
} as ISeoData;
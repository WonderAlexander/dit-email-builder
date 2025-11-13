export interface IEmailBlock {
  id: string;
  name: string;
  template: any;
  imgSrc?: string;
  elements?: IEmailElement[];
}

export interface IEmailElementItem {
  id: string;
  template: any;
  text?: string;
}

export interface IEmailElement {
  id: string;
  name: string;
  template: any;
  text?: string;
  iconSrc?: string;
  btnLink?: string;
  btnTextColor?: string;
  btnBgColor?: string;
  btnText?: string;
  personImgSrc?: string;
  personName?: string;
  personJob?: string;
  listItems?: IEmailElementItem[];
}

export interface IEmailHeader {
  headerImageSrc: string;
}

export interface IEmailFooter {
  footerText: string;
  footerImgSrc: string;
}

export interface ITab {
  iconComponent: any;
  label: string;
}

export interface IIconPic {
  name: string;
  iconSrc: string;
}

import { Column, Row } from "common-igrid";
import { IElement, IStyle } from "common-iutils";
import makeLink from "../common/makeLink";

interface OtherExperienceType {
  title: string;
  period: string;
  link: string;
  description: string[];
}

export default class OtherExperience {
  private readonly otherExperience: OtherExperienceType[];
  span = {
    xxl: 24, xl: 24, lg: 24, md: 24, sm: 24, xs: 24,
  }

  constructor({ otherExperience }: { otherExperience: OtherExperienceType[] }) {
    this.otherExperience = otherExperience;
  }

  render() {
   const $row = new Row();
   const elementList = [];
   this.otherExperience.forEach(data => {
     const $link = makeLink(data.link);
     const $title = new Column({
       children: new IElement('h3').innerHTML(data.title + ($link ? $link.innerHTML : '')).getElement(),
       span: this.span
     });

     const $period = new Column({
       children: new IStyle(new IElement('span').setTextContent(data.period).getElement())
         .fontSize('0.7rem')
         .getElement(),
       span: this.span
     })

     const $contentItems = data.description.map(description => new IStyle(new IElement('li').setTextContent(description).getElement())
       .fontSize('0.8rem')
       .getElement());

     const $contentList = new Column({
       children: new IElement('ul')
         .append(...$contentItems)
         .getElement(),
       span: this.span
     })

     elementList.push($title, $period, $contentList);
   });

   return $row.setContent(...elementList);
  }
}
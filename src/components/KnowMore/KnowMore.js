import React, { Component } from 'react';
import classes from './KnowMore.module.css';

const KnowMore = () => {
  return (
    <>
      <div class={classes.wrapper}>
        <ul id={classes.tab}>
          <li>
            <a>CERTIFICATIONS</a>
          </li>
          <li>
            <a>EDUCATION</a>
          </li>
        </ul>
      </div>
      <div class={classes.body}>
        <h1>Body</h1>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla
          elit suscipit odio molestie mattis. Pellentesque eleifend neque ut
          lectus ullamcorper tempus. Curabitur imperdiet erat at nisi gravida
          elementum. Etiam laoreet ornare ex ac luctus. Etiam finibus non magna
          eu rutrum. Fusce molestie euismod orci, eget imperdiet arcu convallis
          sit amet. Phasellus at elementum urna. Curabitur aliquet tellus
          bibendum, vulputate magna vitae, rhoncus purus. Proin ornare faucibus
          nibh, nec condimentum justo consequat eget. Proin vestibulum neque a
          metus mattis, ac tempor felis accumsan. Nunc blandit turpis in mauris
          congue, cursus sagittis justo finibus. Integer et leo sit amet tellus
          volutpat accumsan at vel metus. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nam fringilla elit suscipit odio molestie
          mattis. Pellentesque eleifend neque ut lectus ullamcorper tempus.
          Curabitur imperdiet erat at nisi gravida elementum. Etiam laoreet
          ornare ex ac luctus. Etiam finibus non magna eu rutrum. Fusce molestie
          euismod orci, eget imperdiet arcu convallis sit amet. Phasellus at
          elementum urna. Curabitur aliquet tellus bibendum, vulputate magna
          vitae, rhoncus purus. Proin ornare faucibus nibh, nec condimentum
          justo consequat eget. Proin vestibulum neque a metus mattis, ac tempor
          felis accumsan. Nunc blandit turpis in mauris congue, cursus sagittis
          justo finibus. Integer et leo sit amet tellus volutpat accumsan at vel
          metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
          fringilla elit suscipit odio molestie mattis. Pellentesque eleifend
          neque ut lectus ullamcorper tempus. Curabitur imperdiet erat at nisi
          gravida elementum. Etiam laoreet ornare ex ac luctus. Etiam finibus
          non magna eu rutrum. Fusce molestie euismod orci, eget imperdiet arcu
          convallis sit amet. Phasellus at elementum urna. Curabitur aliquet
          tellus bibendum, vulputate magna vitae, rhoncus purus. Proin ornare
          faucibus nibh, nec condimentum justo consequat eget. Proin vestibulum
          neque a metus mattis, ac tempor felis accumsan.
        </p>
      </div>
    </>
  );
};


export default KnowMore;

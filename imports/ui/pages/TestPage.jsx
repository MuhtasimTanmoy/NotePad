import React, { Component } from 'react';

import Layout from '/imports/ui/layouts/SampleLayout.jsx';
import TestPageContent from '/imports/ui/components/dummy.jsx';

export default class HomePage extends Component{

  render(){
    console.log("SamplePage being rendered");

      return(
        <Layout content={<TestPageContent/>}/>
      );
  }
}

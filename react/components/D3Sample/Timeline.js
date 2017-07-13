import d3 from 'd3';
import React, { Component } from 'react'

class Timeline extends Component {
  constructor({data = []}) {
    super({data});
    const times = d3.extent(data.map(d => d.year));
    const range = [50, 450];
    this.state = { data, times, range};
  }

  componentDidMount() {
    
  }
}

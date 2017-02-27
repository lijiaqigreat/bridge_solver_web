
const {Component, DOM} = require('react');

class TypeSelect extends Component {
  render(){
    const selectedIndex = this.props.selectedIndex;
    return DOM.div(
      { className: "pt-select" },
      DOM.select(
        null,
        selectedIndex == -1 ? DOM.option({value: -1, selected: true }, "") : null,
        ...this.props.items.map((item) => {
          return DOM.option({value: item.index, selected: selectedIndex == item.id }, item.name);
        })
      )
    )
  }
};
module.exports = TypeSelect;

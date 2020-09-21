import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Translator from "./translator/translator";
import Catalog from "./catalog/catalog";
import actions from "./actions/export";
import { objectsMap } from "./utils/objects-utils";
import {
  ToolbarComponents,
  Content,
  SidebarComponents,
  FooterBarComponents,
} from "./components/export";
import { VERSION } from "./version";
import "./styles/export";

import CatalogList from "./components/catalog-view/catalog-list";

const { Toolbar } = ToolbarComponents;
const { Sidebar } = SidebarComponents;
const { FooterBar } = FooterBarComponents;
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

// import "./RightClick.scss";

const catalogW = 90;
const toolbarW = 0;
const sidebarW = 220;
const footerBarH = 20;

const wrapperStyle = {
  display: "flex",
  flexFlow: "row nowrap",
};

class ReactPlanner extends Component {
  getChildContext() {
    return {
      ...objectsMap(actions, (actionNamespace) => this.props[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
    };
  }

  componentWillMount() {
    let { store } = this.context;
    let { projectActions, catalog, stateExtractor, plugins } = this.props;
    plugins.forEach((plugin) => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
  }

  componentWillReceiveProps(nextProps) {
    let { stateExtractor, state, projectActions, catalog } = nextProps;
    let plannerState = stateExtractor(state);
    let catalogReady = plannerState.getIn(["catalog", "ready"]);
    if (!catalogReady) {
      projectActions.initCatalog(catalog);
    }
  }

  handleClick(e, data) {
    alert(`Clicked on menu ${data.item}`);
  }
  render() {
    let { width, height, state, stateExtractor, ...props } = this.props;

    let contentW = width;
    // let catalogW = width - toolbarW - sidebarW;
    let toolbarH = height - footerBarH;
    let contentH = height - footerBarH;
    let sidebarH = height;

    let extractedState = stateExtractor(state);

    return (
      <ContextMenuTrigger id="add_same_id">
        <div className="bg">
          <div className="hight">Right Click for Open Menu</div>
          <ContextMenu className="menu" id="add_same_id">
            <Sidebar
              width={sidebarW}
              height={sidebarH}
              state={extractedState}
              {...props}
            />
          </ContextMenu>

          <Toolbar
            // width={toolbarW}
            // height={toolbarH}
            state={extractedState}
            {...props}
          />
          <div style={{ ...wrapperStyle, height }}>
            <Draggable handle=".handle">
              <div>
                <div className="handle handle-drag">
                  <i className="fas fa-grip-horizontal handle-drag-icon"></i>
                </div>
                <div>
                  <CatalogList
                    state={extractedState}
                    width={catalogW}
                    height={sidebarH}
                  />
                </div>
              </div>
            </Draggable>
            {/* <CatalogPage /> */}

            <Content
              width={contentW}
              height={contentH}
              state={extractedState}
              {...props}
              onWheel={(event) => event.preventDefault()}
            />

            {/* <FooterBar width={width} height={footerBarH} state={extractedState} {...props} /> */}
          </div>
        </div>
      </ContextMenuTrigger>
    );
  }
}

ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.func),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string,
};

ReactPlanner.contextTypes = {
  store: PropTypes.object.isRequired,
};

ReactPlanner.childContextTypes = {
  ...objectsMap(actions, () => PropTypes.object),
  translator: PropTypes.object,
  catalog: PropTypes.object,
};

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: `React-Planner ${VERSION}`,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {},
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState,
  };
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, (actionNamespace) =>
    bindActionCreators(actions[actionNamespace], dispatch)
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlanner);

import React from "react";
import createSetStateOnEventMixin from "./createSetStateOnEventMixin";
import { _ } from "../core/localization";
import { classSet } from "../core/util";


class ClearButton extends React.Component {

    getState() {
        return {isEnabled: this.props.lc.canUndo()};
    }

    getInitialState() {
        return this.getState();
    }

    mixins = [createSetStateOnEventMixin("drawingChange")];

    render() {
        const {lc} = this.props;

        const className = classSet({
            "lc-clear": true,
            "toolbar-button": true,
            "fat-button": true,
            "disabled": !this.state.isEnabled
        });
        const onClick = lc.canUndo() ? (() => lc.clear()) : function() {};

        return (
            <div className={className} onClick={onClick}>
                {_("Clear")}
            </div>
        );
    }
}


export default ClearButton;
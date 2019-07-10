import Prototypes from "prop-types";

export function TableRow(props) {
    return (null);
}

TableRow.prototype = {
    header: Prototypes.string.isRequired,
    data: Prototypes.string.isRequired,
    template: Prototypes.any,
    width: Prototypes.number,
    onClick: Prototypes.func,
    text: Prototypes.string
}

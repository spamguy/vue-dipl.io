import Snap from 'snapsvg-cjs';

let _snapSVG,
    _phase;

export default {
    processSVGFragment(baseSVG, game, phase) {
        _phase = phase;
        _snapSVG = Snap(baseSVG.node.lastElementChild);

        colourSupplyCentres();

        // Get height/width, apply them to viewBox, then wipe height/width.
        _snapSVG.attr('viewBox', '0 0 ' + _snapSVG.attr('width') + ' ' + _snapSVG.attr('height'));
        _snapSVG.attr('height', '100%');
        _snapSVG.attr('width', '100%');
        return _snapSVG;
    }
};

function colourSupplyCentres() {
    _phase.SCs.forEach(sc => {
        // TODO: Select path#{sc.Province}Center and set fill to colour of sc.Nation.
    });
}

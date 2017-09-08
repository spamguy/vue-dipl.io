import Snap from 'snapsvg-cjs';

export default {
    processSVGFragment(baseSVG, game, phase) {
        let snapSVG = Snap(baseSVG.node.lastElementChild);

        // Get height/width, apply them to viewBox, then wipe height/width.
        snapSVG.attr('viewBox', '0 0 ' + snapSVG.attr('width') + ' ' + snapSVG.attr('height'));
        snapSVG.attr('height', '100%');
        snapSVG.attr('width', '100%');
        return baseSVG;
    }
};

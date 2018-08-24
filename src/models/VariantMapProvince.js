export default (() => {
    function VariantMapProvince(el) {
        this.name = el.id;
        this.d = el.getAttribute('d');
    }

    VariantMapProvince.prototype = {
    }

    return VariantMapProvince;
})();

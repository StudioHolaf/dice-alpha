/**
 * Created by Algost on 19/04/2017.
 */

class PhysicalModel
{

    constructor(id, body, castshadow, receiveshadow, geomety, material, visible, mass, inertia, scale){
    this._id = id;
    this._body = body;
    this._castShadow = castshadow;
    this._receiveShadow = receiveshadow;
    this._geometry = geomety;
    this._material = material;
    this._visible = visible;
    this._mass = mass;
    this._inertia = inertia;
    this._scale = scale;
}

    get id(){
            return this._id;
    }

    set id(id) {
    this._id = id;
    }

    get body(){
        return this._body;
    }

    set body(body) {
        this._body = body;
    }

    get castShadow(){
        return this._castShadow;
    }

    set castShadow(castshadow) {
        this._castShadow = castshadow;
    }

    get receiveShadow(){
        return this._receiveShadow;
    }

    set receiveShadow(receiveshadow) {
        this._castShadow = receiveshadow;
    }

    get geometry(){
        return this._geometry;
    }

    set geometry(geometry) {
        this._geometry = geometry;
    }

    get material(){
        return this._material
    }

    set material(material) {
        this._material = material;
    }

    get visible(){
        return this._visible
    }

    set visible(visible) {
        this._visible = visible;
    }

    get mass(){
        return this._mass
    }

    set mass(mass) {
        this._mass = mass;
    }

    get inertia(){
        return this._inertia
    }

    set intertia(inertia) {
        this._inertia = inertia;
    }

    get scale(){
        return this._scale
    }

    set scale(scale) {
        this._scale = scale;
    }

}
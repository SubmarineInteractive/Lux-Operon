/**
 * Level class
 */
 class Level extends THREE.Object3D {

   /**
    * Constructor function
    * @param {Fog} Fog instance
    * @param {Terrain} Terrain instance
    * @param {Player} Player instance
    */
   constructor(Fog, Terrain, Player) {

     super();

     this.terrain = Terrain;

     this.fog = Fog;

     this.player = Player;

     this.add(this.terrain);

     this.add(this.player);

   }

   /**
    * update function
    * @param {number} delta  Delta time from three global clock
    */
   update(delta) {
     this.player.update(delta);

   }
 }


export default Level;
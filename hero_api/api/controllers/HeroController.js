/**
 * HeroController
 *
 * @description :: Server-side logic for managing heroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    show: function(req, res){
        Hero.find({}).exec(function(err, heroes){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            // res.view('show',{heroes:heroes});
            res.json(heroes);
        });
    },

    create: function(req, res){
        
        var hero_no = req.body.hero_no;
        var name = req.body.name;

        var hero = {
            hero_no: +hero_no,
            name: name
        }
        Hero.create(hero).exec(function(err, heroes){
            if(err){
                // sails.log(JSON.stringify(err,null,2));
                res.send(500, {error: 'Database Error'});
            }
            res.json(heroes);
        });
    },

    find: function(req, res) {
        var criteria = { hero_no : +req.param('hero_no') };
        sails.log(criteria);

        Hero.findOne(criteria).exec(function(err, hero){
            if(err) {
                return res.serverError(err);
            }
            return res.json(hero);
        });
    },

    search: function(req, res) {
        // var criteria = { name: req.param('name') };
        // sails.log(criteria);

        var heroes = Hero.find({

            where: { name: 'john' },
            select: [ 'name' ]

          });

          return json(heroes);
    },

    update: function(req, res){
        var criteria = { hero_no: +req.param('hero_no') };
        var name = req.body.name;


        Hero.update(criteria , {name: name}).exec(function(err, hero){
            if(err){
                return res.send(500, {error: 'Database Error'});
            }
            return res.json(hero);
        });
    },

    delete: function(req, res){

        var criteria = { hero_no : +req.param('hero_no') };
        console.log(criteria);

        Hero.destroy(criteria).exec(function(err, heroes){
            sails.log('in destroy');
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.ok();
        });
    },

};


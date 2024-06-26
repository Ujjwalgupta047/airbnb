module.exports =(fn1)=>{
  return function(req,res,next){
     fn1(req,res,next).catch(next);
  }
}
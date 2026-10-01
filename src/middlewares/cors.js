const parseOrigins = ()=>
(process.env.ALLOWED_ORIGINS||'http://localhost:5173')
.split(',')
.map((o)=>o.trim())
.filter(Boolean)


const cors = (req,res,next)=>{
    const allowed = parseOrigins();

    const origin = req.headers.origin;

    if(origin && allowed.includes(origin)){

        res.setHeader(
            "Access-Control-Allow-Origin",
            origin
        );

        res.setHeader("Vary","Origin");

        res.setHeader(
            "Access-Control-Allow-Credentials",
            "true"
        );
    }

        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET,POST,PATCH,PUT,DELETE,OPTIONS"
        );

        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type,Authorization"
        );

        if(req.method === "OPTIONS"){
            return res.sendStatus(204);
        }
  

    return next();
}

export default cors;
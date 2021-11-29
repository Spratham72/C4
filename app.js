const express=require ("express");
const mongoose=require ("mongoose");
const app=express();
app.use(express.json());

function connect(){
    return mongoose.connect('mongodb://127.0.0.1:27017/evaluation')
}
const citySchema=new mongoose.Schema({
    name:{type:String, required:true},
    company:[{type: mongoose.Schema.Types.ObjectId,ref:"Company", required:true}],
    skills:{type: mongoose.Schema.Types.ObjectId,ref:"Skill", required:true}
},
{
    versionKey: false,
    timestamps: true,
  })
const City=mongoose.model("City",citySchema);

const skillSchema=new mongoose.Schema({
    name:{type:String, required:true},
},
{
    versionKey: false,
    timestamps: true,
  })
const Skill=mongoose.model("Skill",skillSchema);

const companySchema=new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String, required:true},
    openings:{type:Number, required:true},
    ratings:{type:Number, required:true},
    job_type:{type:String, required:true},
    notice_period:{type:Number, required:true},
    skills:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Skill"}
},
{
    versionKey: false,
    timestamps: true,
  })
const Company=mongoose.model("Company",companySchema);

//Skill Crud 
app.post('/skill',async (req,res)=>{
    try {
        const item=await Skill.create(req.body)
        return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

app.get('/skill',async (req,res)=>{
    try {
        const item=await Skill.find().lean().exec();
        return res.status(200).send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

//Company Crud 
app.post('/company',async (req,res)=>{
    try {
        const item=await Company.create(req.body)
        return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

app.get('/company',async (req,res)=>{
    try {
        const item=await Company.find().lean().exec();
        return res.status(200).send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/company/:type',async (req,res)=>{
    try {
        const item=await Company.find({job_type:req.params.type}).lean().exec();
        return res.status(200).send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

app.get('/company/notice/:notice',async (req,res)=>{
    try {
        const item=await Company.find({notice_period:req.params.notice}).lean().exec();
        return res.status(200).send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})


app.get('/company/ratings/sort',async (req,res)=>{
    try {
        const item=await Company.find().sort({"ratings":-1}).lean().exec();
        return res.status(200).send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

app.get('/company/opening/job',async (req,res)=>{
    try {
        const item=await Company.find().sort({"openings":-1}).lean().exec();
        return res.status(200).send(item[0])
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})


//City Crud 
app.post('/city',async (req,res)=>{
    try {
        const item=await City.create(req.body)
        return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

app.get('/city',async (req,res)=>{
    try {
        const item=await City.find().lean().exec();
        return res.status(200).send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/:city/:skill',async (req,res)=>{
    try {
        const item=await City.find({name:req.params.city,skills:req.params.skill}).populate("skills").lean().exec();
        
        return res.status(200).send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})


app.listen(1234,async()=>{
    await connect();
    console.log("server is running 1234");
})
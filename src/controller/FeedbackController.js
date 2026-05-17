const Feedback = require('../modal/Feedback');

const getfeedback = async (req, res)=>{
 let data = await Feedback.find();
 res.send(data);
}

const addFeedback = async(req, res)=>{
    try{
        const userId = req.params.userId;
        const productId = req.params.productId
        const {message, rate} = req.body

        if(!message && !userId){
            return res.status(404).send({message: "message is required"})
        }

        const feedback = new Feedback({
            message,
            rate,
            userId : userId,
            productId : productId,
            
        })

        const result = await feedback.save();

        res.status(200).send({
            message : "feedback added succesfully",
            data : result

        })
    }catch(err){
        return res.status(500).send({message: "Something went wrong",err})
    }
};


module.exports ={getfeedback,addFeedback}
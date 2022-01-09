import o2x from 'object-to-xml'

const contentType = (req,unit='data',set='data-set') => {
    const requestedType = req.headers['accept']

    if(requestedType === 'application/json'){
        return m => m
    }
    if (requestedType === 'application/xml') {
        return m => {
            if(m instanceof Array){
                return o2x({[set]: {[unit]: m}})
            }
            return o2x({[unit]: m})
        }
    }
    return null
}

export default contentType
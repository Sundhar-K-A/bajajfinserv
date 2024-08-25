export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { data } = req.body;

            if (!data) {
                return res.status(400).json({
                    is_success: false,
                    message: "Missing required fields"
                });
            }
            
            
            let evenNumbers = [];
            let oddNumbers = [];
            let alphabets = [];
            let highestLowercaseAlphabet = '';

            data.forEach(item => {
                if (!isNaN(item)) { 
                    if (parseInt(item) % 2 === 0) {
                        evenNumbers.push(item);
                    } else {
                        oddNumbers.push(item);
                    }
                } else if (/^[a-zA-Z]+$/.test(item)) { 
                    alphabets.push(item);
                    if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                        highestLowercaseAlphabet = item;
                    }
                }
            });

            const response = {
                is_success: true,
                user_id: `john_doe_21BCE2756`,
                email: "john@xyz.com", 
                roll_number: "ABCD123",
                numbers: [...evenNumbers, ...oddNumbers],
                alphabets: alphabets,
                highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
            };

            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json({
                is_success: false,
                message: error.message
            });
        }
    } else if (req.method === 'GET') {
        return res.status(200).json({
            operation_code: 1
        });
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}

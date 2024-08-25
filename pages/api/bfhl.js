
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { data } = req.body;

            if (!data || !full_name || !dob) {
                return res.status(400).json({
                    is_success: false,
                    message: "Missing required fields"
                });
            }

            let evenNumbers = [];
            let oddNumbers = [];
            let alphabets = [];

            data.forEach(item => {
                if (!isNaN(item)) { 
                    if (parseInt(item) % 2 === 0) {
                        evenNumbers.push(item);
                    } else {
                        oddNumbers.push(item);
                    }
                } else if (/^[a-zA-Z]+$/.test(item)) { 
                    alphabets.push(item.toUpperCase());
                }
            });

            const response = {
                is_success: true,
                user_id: `hohn_doe_21BCE2756`,
                email: "john@xyz.com", 
                roll_number: "ABCD123",
                numbers: numbers,
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

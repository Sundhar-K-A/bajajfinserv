
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { data, full_name, dob } = req.body;

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
                user_id: `${full_name.toLowerCase().replace(/\s+/g, '_')}_${dob.replace(/\//g, '')}`,
                odd_numbers: oddNumbers,
                even_numbers: evenNumbers,
                alphabets: alphabets
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

import "./payment.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { PaystackButton } from "react-paystack";

const Payment = (info) => {
  const [student, setStudent] = useState({});
  const [progId, setProgId] = useState();
  const [payNumber, setPayNumber] = useState();
  const [amt, setAmt] = useState();
  const [showForm, setShowForm] = useState(false);

  const handlePay = (id, n) => {
    setProgId(id);
    setPayNumber(`pay${n}`);
    setShowForm(true);
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const url = baseUrl + "/api/students/" + info.reg;
      await axios
        .get(url)
        .then((res) => {
          setStudent(res.data);
        })
        .catch((er) => {
          console.log(er.message);
        });
    };

    fetchStudent();
  }, []);

  const pay = async () => {
    const stmt = `UPDATE payment SET ${payNumber}=${amt} WHERE reg='${info.reg}' AND progId='${progId}'`;

    const url = baseUrl + "/api/payments/?stmt=" + stmt;
    await axios.put(url).catch((er) => {
      console.log(er.message);
    });
  };

  //paystack
  const publicKey = process.env.REACT_APP_PAYSTACK_API;
  const amount = amt * 100; // naira

  const componentProps = {
    email: student?.bios?.email,
    amount,
    metadata: {
      name: student?.bios?.fname,
      phone: student?.bios?.phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => {
      alert("Wait! You need this oil, don't go!!!!");
      pay();
      info.setShowPayment(false);
      info.setShowStudent(true);
    },
  };
  console.log(student);
  console.log({ progId, payNumber });
  return (
    <div className="payment">
      <div className="heading">Payment</div>
      <div className="programs">
        {student.payments?.map((pay) => (
          <div className="program">
            <span>{pay?.Program}</span>
            {pay?.pay1 === 0 ? (
              <button
                onClick={() => {
                  handlePay(pay?.progId, 1);
                }}
              >
                Payment1
              </button>
            ) : null}
            {pay?.pay2 === 0 ? (
              <button
                onClick={() => {
                  handlePay(pay?.progId, 2);
                }}
              >
                Payment2
              </button>
            ) : null}
            {pay?.pay3 === 0 ? (
              <button
                onClick={() => {
                  handlePay(pay?.progId, 3);
                }}
              >
                Payment3
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {showForm && (
        <div className="paystack">
          <form>
            <div className="form-field">
              <label htmlFor="">Enter the amount</label>
              <input
                type="number"
                onChange={(e) => {
                  setAmt(e.target.value);
                }}
              />
            </div>
          </form>
          <PaystackButton {...componentProps} />
        </div>
      )}
    </div>
  );
};

export default Payment;

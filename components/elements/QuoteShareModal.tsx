import React, { useState } from "react";
import { Modal, Input, Button, Tag, Space, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

interface QuoteShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (emails: string[], withPrice: boolean) => void;
    loading?: boolean;
}

const QuoteShareModal: React.FC<QuoteShareModalProps> = ({
    isOpen,
    onClose,
    onSend,
    loading = false,
}) => {
    const [emailInput, setEmailInput] = useState("");
    const [emails, setEmails] = useState<string[]>([]);
    const [withPrice, setWithPrice] = useState(true);

    const handleAddEmail = () => {
        const email = emailInput.trim();
        if (!email) return;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            message.error("Invalid email address");
            return;
        }

        if (emails.includes(email)) {
            message.warning("Email already added");
            return;
        }

        setEmails([...emails, email]);
        setEmailInput("");
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setEmails(emails.filter((email) => email !== emailToRemove));
    };

    const handleSend = () => {
        if (emails.length === 0) {
            // If there's text in the input but not added to the list, try adding it first
            if (emailInput) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
                    message.error("Please add a valid email address");
                    return;
                }
                onSend([emailInput], withPrice);
                setEmailInput("");
                return;
            }
            message.error("Please add at least one email address");
            return;
        }
        onSend(emails, withPrice);
    };

    return (
        <Modal
            title={
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    Flights Quotation
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            maskClosable={false}
            width={600}
        >
            <div style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "8px", fontWeight: "600" }}>Email or Mobile</div>

                <div style={{
                    marginBottom: "20px",
                    border: "1px solid #d9d9d9",
                    padding: "5px",
                    borderRadius: "6px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    alignItems: "center"
                }}>
                    {emails.map((email) => (
                        <Tag
                            key={email}
                            closable
                            onClose={(e) => {
                                e.preventDefault();
                                handleRemoveEmail(email);
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                                padding: "4px 8px",
                                background: "#e6e6e6",
                                border: "none"
                            }}
                        >
                            {email}
                        </Tag>
                    ))}
                    <Input
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        onPressEnter={(e) => {
                            e.preventDefault();
                            handleAddEmail();
                        }}
                        placeholder={emails.length === 0 ? "Enter email address" : ""}
                        bordered={false}
                        style={{ flex: 1, minWidth: "150px" }}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px", marginBottom: "20px" }}>
                    <Button
                        size="large"
                        type={withPrice ? "primary" : "default"}
                        onClick={() => setWithPrice(true)}
                        style={{
                            width: "150px",
                            height: "45px",
                            background: withPrice ? "#ff7e29" : "#fff",
                            borderColor: "#ff7e29",
                            color: withPrice ? "#fff" : "#ff7e29",
                            fontWeight: "bold",
                        }}
                    >
                        With Price
                    </Button>
                    <Button
                        size="large"
                        type={!withPrice ? "primary" : "default"}
                        onClick={() => setWithPrice(false)}
                        style={{
                            width: "150px",
                            height: "45px",
                            background: !withPrice ? "#ff7e29" : "#fff",
                            borderColor: "#ff7e29",
                            color: !withPrice ? "#fff" : "#ff7e29",
                            fontWeight: "bold",
                        }}
                    >
                        Without Price
                    </Button>
                </div>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                        type="primary"
                        onClick={handleSend}
                        loading={loading}
                        style={{
                            width: "100%",
                            height: "45px",
                            background: "#ff7e29",
                            borderColor: "#ff7e29",
                            fontWeight: "bold",
                            fontSize: "16px"
                        }}
                    >
                        Send Quote
                    </Button>
                </div>

            </div>
        </Modal>
    );
};

export default QuoteShareModal;

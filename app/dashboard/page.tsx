import StatusButton from "@/components/StatusButton";
import Contact from "@/models/Contact";

const Dashboard = async () => {
  const contacts = await Contact.find();
  return (
    <div>
      <h1>Contact Messages</h1>
      {contacts.map((contact) => (
        <div key={contact._id}>
          <h3>{contact.name}</h3>
          <p>{contact.email}</p>
          <p>{contact.message}</p>
          {contact.status === "resolved" ? (
            <p className="text-green-500 font-semibold">Resolved</p>
          ) : (
            <StatusButton id={contact._id.toString()} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

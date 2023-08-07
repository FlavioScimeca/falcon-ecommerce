import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { fetchOrder } from '@/libs/apis';
import { authOptions } from '@/libs/auth';

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const email = session?.user?.email as string;
  const orderData: any = await fetchOrder(email);

  return (
    <div>
      <div className="relative overflow-x-auto px-1 sm:px-10 md:px-14 lg:px-24 pb-40">
        <table className=" w-full text sm text-left">
          <thead className="text-xs uppercase">
            <tr>
              <th scope="col" className="px-2 md:px-6 py-3">
                Product(s) name
              </th>
              <th scope="col" className="px-2 md:px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-2 md:px-6 py-3">
                Order Status
              </th>
              <th scope="col" className="px-2 md:px-6 py-3">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order: any) => {
              const totalPrice = order.items.reduce(
                (acc: number, item: any) => {
                  const itemPrice = item.quantity * item.game.price;
                  return acc + itemPrice;
                },
                0
              );

              return (
                <tr key={order._id} className="border-b border-black p-2">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {order.items.map((item: any) => (
                      <span key={item._id} className="border-b border-gray-600">
                        {item.game.name} ({item.quantity}) <br />
                      </span>
                    ))}
                  </th>
                  <td className="px-6 py-4">
                    {order.items.map((item: any) => (
                      <span key={item._id}>
                        {item.game.price} <br />
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">{order.orderStatus}</td>
                  <td className="px-6 py-4">$ {totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;

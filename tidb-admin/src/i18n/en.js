import englishMessages from 'ra-language-english'

export default {
  ...englishMessages,
  clustermap: {
    name: 'Cluster Map',
  },
  storage: {
    name: 'Storage',
  },
  database: {
    name: 'Database',
  },
  diagnose: {
    name: 'Diagnose',
  },
  pos: {
    search: 'Search',
    configuration: 'Configuration',
    language: 'Language',
    theme: {
      name: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    dashboard: {
      monthly_revenue: 'Monthly Revenue',
      new_orders: 'New Orders',
      pending_reviews: 'Pending Reviews',
      new_customers: 'New Customers',
      pending_orders: 'Pending Orders',
      order: {
        items:
          'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
      },
      welcome: {
        title: 'Welcome to react-admin demo',
        subtitle:
          "This is the admin of an imaginary poster shop. Fell free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        aor_button: 'react-admin site',
        demo_button: 'Source for this demo',
      },
    },
  },
  resources: {
    customers: {
      name: 'Customer |||| Customers',
      fields: {
        commands: 'Orders',
        groups: 'Segments',
        last_seen_gte: 'Visited Since',
        name: 'Name',
        total_spent: 'Total spent',
      },
      tabs: {
        identity: 'Identity',
        address: 'Address',
        orders: 'Orders',
        reviews: 'Reviews',
        stats: 'Stats',
      },
      page: {
        delete: 'Delete Customer',
      },
    },
    commands: {
      name: 'Order |||| Orders',
      fields: {
        basket: {
          delivery: 'Delivery',
          reference: 'Reference',
          quantity: 'Quantity',
          sum: 'Sum',
          tax_rate: 'Tax Rate',
          total: 'Total',
          unit_price: 'Unit Price',
        },
        customer_id: 'Customer',
        date_gte: 'Passed Since',
        date_lte: 'Passed Before',
        total_gte: 'Min amount',
        status: 'Status',
        returned: 'Returned',
      },
    },
  },
}

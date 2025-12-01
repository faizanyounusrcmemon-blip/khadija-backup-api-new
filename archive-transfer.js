app.post("/api/archive-transfer", async (req, res) => {
  try {
    const { start_date, end_date, password } = req.body;

    if (password !== "faizanyounus2122")
      return res.json({ success: false, error: "Wrong password" });

    // PURCHASES COPY
    await supabase.rpc("transfer_purchases", {
      start_date,
      end_date,
    });

    // SALES COPY
    await supabase.rpc("transfer_sales", {
      start_date,
      end_date,
    });

    // RETURNS COPY
    await supabase.rpc("transfer_returns", {
      start_date,
      end_date,
    });

    res.json({ success: true, message: "Transfer Completed" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

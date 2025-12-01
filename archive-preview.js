// ===============================================
// 1) ARCHIVE PREVIEW API (FINAL RPC VERSION)
// ===============================================
app.post("/api/archive-preview", async (req, res) => {
  try {
    const { start_date, end_date } = req.body;

    if (!start_date || !end_date) {
      return res.json({
        success: false,
        error: "Missing dates",
      });
    }

    // ========= RUN POSTGRES FUNCTION archive_summary() =========
    const { data, error } = await supabase.rpc("archive_summary", {
      p_start: start_date,
      p_end: end_date,
    });

    if (error) {
      return res.json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      rows: data,
    });

  } catch (err) {
    return res.json({
      success: false,
      error: err.message,
    });
  }
});

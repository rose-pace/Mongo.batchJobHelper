# Mongo.batchJobHelper
This project is a big F-A-I-L

I was trying to use Mongo cursor's next function to call for another record when it was needed but I ended up with loads of errors as the connection to the server got destroyed. The problem was that using the cursor as a stream could overrun the buffer if the result set was too large. I was able to fix the problem much easier in the main batchJobHelper project by pausing the stream when the buffer grew beyone a certain size and resuming when it dropped to a safer level. Don't know why I didn't try that first before starting this project.
